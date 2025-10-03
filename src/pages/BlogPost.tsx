import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogPostById, getRelatedPosts } from '../data/blogData';
import { 
  ArrowLeftIcon, 
  CalendarIcon, 
  ClockIcon, 
  EyeIcon, 
  HeartIcon, 
  ShareIcon, 
  BookOpenIcon,
  TagIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<{
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    authorRole: string;
    authorImage: string;
    publishedDate: string;
    readTime: string;
    category: string;
    image: string;
    views: number;
    likes: number;
    comments: number;
    tags: string[];
    sources: { name: string; url: string; }[];
    featured?: boolean;
  } | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<NonNullable<typeof post>[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    // Get blog post by ID from centralized data
    const foundPost = getBlogPostById(id || '0');
    if (foundPost) {
      setPost(foundPost);
      setLikes(foundPost.likes);
      // Get related posts from centralized data
      const related = getRelatedPosts(parseInt(id || '0'), 3);
      setRelatedPosts(related);
    } else {
      // Post not found, redirect to blog page
      navigate('/blog');
    }
  }, [id, navigate]);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-white">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              {post.featured && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author and Meta Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{post.author}</h3>
                  <p className="text-sm text-gray-600">{post.authorRole}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  {formatDate(post.publishedDate)}
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <EyeIcon className="h-4 w-4" />
                  {post.views} views
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isLiked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <HeartIcon className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                {likes} {likes === 1 ? 'Like' : 'Likes'}
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ShareIcon className="h-5 w-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Image */}
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-white">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>

      {/* Sources */}
      {post.sources && post.sources.length > 0 && (
        <div className="bg-gray-50">
          <div className="container-custom py-12">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Sources & References</h3>
              <div className="space-y-3">
                {post.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    {source.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="bg-white border-t">
        <div className="container-custom py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <TagIcon className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-900">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50">
          <div className="container-custom py-16">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Related Articles
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                          {relatedPost.category}
                        </span>
                        <span className="text-sm text-gray-500">{relatedPost.readTime}</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                        <span>{relatedPost.author}</span>
                        <span>{formatDate(relatedPost.publishedDate)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Blog CTA */}
      <div className="bg-primary-600">
        <div className="container-custom py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Discover More Insights
            </h3>
            <p className="text-primary-100 mb-6">
              Explore our collection of articles on technology, automation, and business growth.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <BookOpenIcon className="h-5 w-5" />
              Browse All Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
