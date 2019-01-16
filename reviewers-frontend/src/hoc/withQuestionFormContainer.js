import React, { Component } from 'react';
import questionAPI from '../api/question';
import languageAPI from '../api/language';
import { withRouter } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import withFormValidation from '../hoc/withFormValidation';

const withQuestionFormContainer = (WrappedComponent, apiForSubmit, apiForFormInit) => {
  const QuestionFormContainer = class extends Component {
    state = {
      languageOptions: [],
      selectedLanguageOption: {},
      form: {
        author: '',
        title: '',
        body: '',
        sourceCode: '',
        language: ''
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
  
    onSubmit = async (e) => {
      const { 
        form: { 
          title, 
          body, 
          sourceCode 
        } 
      } = this.state;

      const { 
        match: { 
          params 
        },
        validateForm,
        isValidForm
      } = this.props;

      validateForm([
        {
          field: 'title',
          tests: [
            [title, '제목이 입력되지 않았습니다.'],
            [title.length <= 50, '길이의 제한은 50자 입니다.'] 
          ]
        },
        {
          field: 'body',
          tests: [
            [body, '내용이 입력되지 않았습니다.'],
            [body.length <= 10000, '길이의 제한은 10000자 입니다.']
          ]
        },
        {
          field: 'sourceCode',
          tests: [
            [sourceCode, '소스코드가 입력되지 않았습니다.']
          ]
        }
      ])

      if (!isValidForm()) {
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
        selectedLanguageOption,
        languageOptions
      } = this.state;
      const { errors } = this.props;

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

  return withRouter(useAuth(withFormValidation(QuestionFormContainer)));
}

export default withQuestionFormContainer;