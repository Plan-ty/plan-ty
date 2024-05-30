import React, { useState } from 'react';
import Widgets from '../widgets/Widgets';
import TemplatesManager from '../templates/TemplateManager';
import './Home.css';

const Home = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="home">
      <TemplatesManager onTemplateSelect={handleTemplateSelect} />
      <div className="dashboard">
        {selectedTemplate ? (
          selectedTemplate.parameters && selectedTemplate.parameters.length > 0 ? (
            selectedTemplate.parameters.map(param => (
              <Widgets
                key={param.id}
                parameterName={param.type}
                currentValue={0} // Set initial currentValue to 0 or mock data
                min={param.min}
                warningMin={param.warningMin}
                warningMax={param.warningMax}
                max={param.max}
                routePath={`/${param.type}`}
              />
            ))
          ) : (
            <p>No parameters found for this template.</p>
          )
        ) : (
          <p>Please select a template to view its parameters.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
