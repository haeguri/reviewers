import React, { Component } from 'react';
import questionAPI from '../api/question';
import languageAPI from '../api/language';
import { withRouter } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

const withQuestionFormContainer = (WrappedComponent, apiForSubmit, apiForFormInit) => {
  const QuestionFormContainer = class extends Component {
    hasValidForm = true;
    state = {
      languageOptions: [],
      selectedLanguageOption: {},
      form: {
        author: '',
        title: '',
        body: '',
        sourceCode: '',
        language: ''
      },
      errors: {
        title: null,
        body: null,
        sourcecode: null
      }
    }

    componentDidMount = async () => {
      const { match: { params }, authInfo } = this.props;
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

      initData.author = authInfo._id;

      this.setState((state) => ({
        form: initData,
        languageOptions,
        selectedLanguageOption,
      }));
    }

    setErrorState = (field, msg) => {
      if (msg === null) {
        this.hasValidForm = true;
      } else {
        this.hasValidForm = false;
      }
  
      this.setState((state) => ({
        errors: {
          ...state.errors,
          [field]: msg
        }
      }))
    }  
  
    onSubmit = async (e) => {
      const { form: { title, body, sourceCode } } = this.state;
      const { match: { params } } = this.props;

      if (!title) {
        this.setErrorState('title', '제목이 입력되지 않았습니다.');
      } else if (title.length > 50) {
        this.setErrorState('title', '길이의 제한은 50자 입니다.');
      } else {
        this.setErrorState('title', null);
      }

      if (!body) {
        this.setErrorState('body', '내용이 입력되지 않았습니다.');
      } else if (body.length > 10000) {
        this.setErrorState('body', '길이의 제한은 1000자 입니다.');
      } else {
        this.setErrorState('body', null);
      }

      if (!sourceCode) {
        this.setErrorState('sourceCode', '소스코드가 입력되지 않았습니다.');
      } else {
        this.setErrorState('sourceCode', null);
      }

      if (!this.hasValidForm) {
        this.hasValidForm = true;
        return;
      }

      try {
        const { data: { _id } } = await apiForSubmit(this.state.form, params.qId);
        this.props.history.push(`/question-detail/${_id}`);
      } catch (err) {
        console.log('error', err);
      }
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
      const { 
        form, 
        errors,
        selectedLanguageOption,
        languageOptions
      } = this.state;

      return (
        <WrappedComponent 
          errors={errors}
          form={form}
          selectedLanguageOption={selectedLanguageOption}
          langOptions={languageOptions}
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