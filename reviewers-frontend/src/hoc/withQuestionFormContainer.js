import React, { Component } from 'react';
import questionAPI from '../api/question';
import languageAPI from '../api/language';
import { withRouter } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

const withQuestionFormContainer = (WrappedComponent, apiForSubmit, apiForFormInit) => {
  const QuestionFormContainer = class extends Component {
    state = {
      languageOptions: [],
      selectedLanguageOption: '',
      form: {
        author: '',
        title: '',
        body: '',
        sourceCode: '',
        language: ''
      }
    }

    componentDidMount = async () => {
      const { match: { params } } = this.props;
      const { data: languageOptions } = await languageAPI.getLanguages();
      let initData;
      let selectedLanguageOption;

      if (apiForFormInit) {
        const { data } = await questionAPI.detailQuestion(params.qId);
        initData = data;
        selectedLanguageOption = data.language;
      } else {
        initData = this.state.form;
        initData.language = languageOptions[0]._id;
        selectedLanguageOption = languageOptions[0];
      }

      // ONLY TEST!!!
      initData.author = (this.props.authInfo && this.props.authInfo._id) || '5c1a22620157ed1fabef733d'

      this.setState((state) => ({
        form: initData,
        languageOptions,
        selectedLanguageOption,
      }));
    }
  
    onSubmit = async (e) => {
      const { match: { params } } = this.props;
      try {
        const { data: { _id } } = await apiForSubmit(this.state.form, params.qId);
        this.props.history.push(`/question-detail/${_id}`);
      } catch (err) {
        console.log('error', err);
      }

      e.preventDefault();
    }

    onTitleChange = (e) => {
      this.setState({
        form: {
          ...this.state.form,
          title: e.target.value
        }
      })
    }
  
    onLangChange = (selectedItem) => {
      this.setState({
        selectedLanguageOption: selectedItem,
        form: {
          ...this.state.form,
          language: selectedItem._id,
        }
      });
    }
  
    onBodyChange = (e) => {
      this.setState({
        form: {
          ...this.state.form,
          body: e.target.value
        }
      })
    }
  
    onCodeChange = (newValue) => {
      this.setState({
        form: {
          ...this.state.form,
          sourceCode: newValue
        }
      });
    }

    render = () => {
      return (
        <WrappedComponent 
          form={this.state.form}
          selectedLanguageOption={this.state.selectedLanguageOption}
          langOptions={this.state.languageOptions}
          onTitleChange={this.onTitleChange}
          onBodyChange={this.onBodyChange}
          onLangChange={this.onLangChange}
          onCodeChange={this.onCodeChange}
          onSubmit={this.onSubmit}
          {...this.props}
        />
      )
    }
  }

  return withRouter(useAuth(QuestionFormContainer));
}

export default withQuestionFormContainer;