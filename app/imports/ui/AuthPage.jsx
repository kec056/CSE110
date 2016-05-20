import React from 'react';

const AuthPage = ({ content, link }) => (
  <div className="page-auth">
    <div className="container">
    <div className="page-content">
      {content}
      {link}
    </div>
    </div>
  </div>
);

AuthPage.propTypes = {
  content: React.PropTypes.element,
  link: React.PropTypes.element,
};

export default AuthPage;
