import React, { useState, useEffect } from 'react';
import "./TemplateManager.css"

const TemplatesManager = ({ onTemplateSelect }) => {
  const [templates, setTemplates] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/templates')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        return response.json();
      })
      .then(data => setTemplates(data))
      .catch(error => {
        console.error(error);
        setFetchError(error.message);
      });
  }, []);

  const handleTemplateClick = (template) => {
    onTemplateSelect(template);
  };

  const handleAddTemplate = () => {
    const templateName = prompt("Enter the name of the new plant template:");
    if (templateName) {
      fetch('http://localhost:5000/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: templateName })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add template');
          }
          return response.json();
        })
        .then(newTemplate => {
          setTemplates([...templates, newTemplate]);
        })
        .catch(error => {
          console.error(error);
          alert('Failed to add template');
        });
    }
  };

  return (
    <div className="template-management">
      {fetchError && (
        <div className="error-message">{fetchError}</div>
      )}
      {templates.map(template => (
        <div
          key={template.id}
          className="template-card"
          onClick={() => handleTemplateClick(template)}
        >
          {template.name}
        </div>
      ))}
      <div className="template-card add-template" onClick={handleAddTemplate}>
        +
      </div>
    </div>
  );
};

export default TemplatesManager;
