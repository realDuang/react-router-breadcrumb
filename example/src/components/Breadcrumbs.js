import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import BreadcrumbsHoc from 'react-router-breadcrumb';
import { menu } from '../constants/menu';
import imgURL from '../assets/home.png';
const BreadcrumbsComponent = ({ breadcrumbs }) => {
  return (
    <div>
      <img src={imgURL} alt="home" style={{ width: '16px' }} />
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.props.path}>
          <Link to={breadcrumb.props.path}>{breadcrumb}</Link>
          {index < breadcrumbs.length - 1 && <i> / </i>}
        </span>
      ))}
    </div>
  );
};

const Breadcrumbs = withRouter(props => {
  const { location } = props;
  return BreadcrumbsHoc(location, menu)(BreadcrumbsComponent);
});

export default Breadcrumbs;
