import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { centerWithAbsSize } from '../../utils/style-utils';

const StyledSection = styled.section`
    .content {
        ${ centerWithAbsSize('desktop') }
    }
`;

const PageContent = props => (
    <StyledSection>
        <section className="content">
            {props.children}
        </section>
    </StyledSection>
)

PageContent.defaultProps = {

};

PageContent.propTypes = {

};

export default PageContent;