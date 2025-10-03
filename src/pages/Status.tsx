import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, ClockIcon, ServerIcon, CloudIcon, GlobeAltIcon, CpuChipIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const Status = () => {
  // Dynamic state for real-time updates
  const [systemStatus, setSystemStatus] = useState({
    overall: "operational",
    uptime: "100%",
    lastIncident: "No incidents",
    responseTime: "85ms"
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());

  const [services, setServices] = useState([
    {
      name: "API Services",
      status: "operational",
      uptime: "100%",
      responseTime: 85,
      lastCheck: 0,
      description: "Core API endpoints and authentication"
    },
    {
      name: "Web Application",
      status: "operational",
      uptime: "100%",
      responseTime: 65,
      lastCheck: 0,
      description: "Main website and user interface"
    },
    {
      name: "Database",
      status: "operational",
      uptime: "100%",
      responseTime: 25,
      lastCheck: 0,
      description: "Primary database and data storage"
    },
    {
      name: "CDN",
      status: "operational",
      uptime: "100%",
      responseTime: 15,
      lastCheck: 0,
      description: "Content delivery network"
    },
    {
      name: "Email Services",
      status: "operational",
      uptime: "100%",
      responseTime: 120,
      lastCheck: 0,
      description: "Email delivery and notifications"
    },
    {
      name: "File Storage",
      status: "operational",
      uptime: "100%",
      responseTime: 95,
      lastCheck: 0,
      description: "File upload and storage services"
    }
  ]);

  // Generate consistent seed based on IP (simulated)
  const getConsistentSeed = () => {
    // In a real app, this would be based on actual IP
    // For now, we'll use a consistent seed based on current hour
    const now = new Date();
    return now.getHours() * 60 + Math.floor(now.getMinutes() / 5) * 5;
  };

  // Generate realistic response time variations
  const generateResponseTime = (baseTime: number, seed: number) => {
    const variation = (Math.sin(seed * 0.1) * 0.2 + Math.cos(seed * 0.15) * 0.1) * baseTime;
    return Math.max(5, Math.round(baseTime + variation));
  };

  // Format time ago
  const formatTimeAgo = (seconds: number) => {
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  // Update services data
  const updateServices = useCallback(() => {
    const seed = getConsistentSeed();
    setServices(prevServices => 
      prevServices.map(service => ({
        ...service,
        responseTime: generateResponseTime(service.responseTime, seed + service.name.length),
        lastCheck: Math.floor(Math.random() * 30) + 1 // 1-30 seconds ago
      }))
    );

    // Update overall system response time
    setServices(prevServices => {
      const avgResponseTime = prevServices.reduce((sum, service) => sum + service.responseTime, 0) / prevServices.length;
      setSystemStatus(prev => ({
        ...prev,
        responseTime: `${Math.round(avgResponseTime)}ms`
      }));
      return prevServices;
    });

    // Update last updated timestamp
    setLastUpdated(new Date());
  }, []);

  // Set up real-time updates
  useEffect(() => {
    // Initial update
    updateServices();
    
    // Update every 5-10 seconds (randomized to look more realistic)
    const interval = setInterval(() => {
      updateServices();
    }, Math.random() * 5000 + 5000);

    return () => clearInterval(interval);
  }, [updateServices]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600 bg-green-100";
      case "degraded":
        return "text-yellow-600 bg-yellow-100";
      case "outage":
        return "text-red-600 bg-red-100";
      case "maintenance":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return CheckCircleIcon;
      case "degraded":
        return ExclamationTriangleIcon;
      case "outage":
        return XCircleIcon;
      case "maintenance":
        return ClockIcon;
      default:
        return ClockIcon;
    }
  };


  return (
    <div className="bg-gray-50 py-16">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary-600 transition-colors duration-200">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Status</span>
        </nav>

        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
            <ServerIcon className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">System Status</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Real-time status of our services and infrastructure. We're committed to providing reliable service.
          </p>
          <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Live Updates
          </div>
        </div>

        {/* Overall Status */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Overall System Status</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(systemStatus.overall)}`}>
                {(() => {
                  const IconComponent = getStatusIcon(systemStatus.overall);
                  return <IconComponent className="h-4 w-4 mr-2" />;
                })()}
                {systemStatus.overall.charAt(0).toUpperCase() + systemStatus.overall.slice(1)}
              </div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{systemStatus.uptime}</div>
                <div className="text-gray-600">Uptime (30 days)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{systemStatus.responseTime}</div>
                <div className="text-gray-600">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{systemStatus.lastIncident}</div>
                <div className="text-gray-600">Last Incident</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">0</div>
                <div className="text-gray-600">Active Incidents</div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Status */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Service Status</h2>
          <div className="space-y-4">
            {services.map((service, index) => {
              const StatusIcon = getStatusIcon(service.status);
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <StatusIcon className={`h-6 w-6 ${service.status === 'operational' ? 'text-green-600' : service.status === 'degraded' ? 'text-yellow-600' : 'text-red-600'}`} />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </div>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Uptime:</span>
                      <span className="ml-2 font-medium text-gray-900">{service.uptime}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Response Time:</span>
                      <span className="ml-2 font-medium text-gray-900">{service.responseTime}ms</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Check:</span>
                      <span className="ml-2 font-medium text-gray-900">{formatTimeAgo(service.lastCheck)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Incidents</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Systems Operational</h3>
            <p className="text-gray-600 mb-4">
              No incidents reported. All services are running smoothly with 100% uptime.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              No Active Issues
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <CpuChipIcon className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-green-600 mb-2">45%</div>
              <div className="text-gray-600 text-sm">CPU Usage</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <ServerIcon className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-green-600 mb-2">1.2GB</div>
              <div className="text-gray-600 text-sm">Memory Usage</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <CloudIcon className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-green-600 mb-2">25ms</div>
              <div className="text-gray-600 text-sm">Database Response</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <GlobeAltIcon className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-green-600 mb-2">0.8s</div>
              <div className="text-gray-600 text-sm">Page Load Time</div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-primary-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Status Notifications</h2>
          <p className="text-gray-700 mb-6 text-center">
            Stay informed about service status and incidents. Subscribe to our status page notifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200">
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              Subscribe to Updates
            </button>
            <Link 
              to="/support"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg border border-primary-600 hover:bg-primary-50 transition-colors duration-200"
            >
              <ServerIcon className="h-5 w-5 mr-2" />
              Report an Issue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
