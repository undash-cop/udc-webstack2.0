import { useState } from 'react';
import type { FormEvent } from 'react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface FormProps {
  title: string;
  description?: string;
  fields: FormField[];
  submitText: string;
  onSubmit: (data: Record<string, string>) => void;
  className?: string;
}

const Form = ({ 
  title, 
  description, 
  fields, 
  submitText, 
  onSubmit, 
  className = '' 
}: FormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Please enter a valid email address';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderField = (field: FormField) => {
    const baseClasses = `
      w-full px-4 py-3 border rounded-lg bg-white text-neutral-900 placeholder-neutral-400
      focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2 focus:ring-offset-white focus:border-primary-500
      hover:border-neutral-400 transition-all duration-300 ease-out
      ${errors[field.name] ? 'border-red-400 focus:ring-red-300/60 focus:border-red-500' : 'border-neutral-300'}
    `;

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={baseClasses}
          />
        );
      
      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={baseClasses}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      default:
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={baseClasses}
          />
        );
    }
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <div className="text-center mb-8">
        <h2 className="heading-section-lg mb-4">{title}</h2>
        {description && (
          <p className="text-lg text-neutral-600">{description}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map(field => (
          <div key={field.name}>
            <label 
              htmlFor={field.name}
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full btn-primary text-lg py-4"
        >
          {submitText}
        </button>
      </form>
    </div>
  );
};

export default Form;
