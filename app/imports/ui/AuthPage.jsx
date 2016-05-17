import React from 'react';

const Authpage = ({ content, link }) => (
  <div className="page auth">
    <div className="page-content">
      {content}
      {link}
    </div>
  </div>
);

Authpage.propTypes = {
  content: React.PropTypes.element,
  link: React.PropTypes.element,
};

export default Authpage;
