import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentWrapper from '../../containers/ContentWrapper';

const PageContent = props => (
    <ContentWrapper>
        { props.children }
    </ContentWrapper>
)

PageContent.defaultProps = {

};

PageContent.propTypes = {

};

export default PageContent;