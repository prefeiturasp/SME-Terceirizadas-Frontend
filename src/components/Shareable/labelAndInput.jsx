import ptBR from "date-fns/locale/pt-BR";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ErrorAlert } from "./Alert";
import "./custom.css";
import { Grid } from "./responsiveBs4";

export const LabelAndInput = props => {
  return (
    <Grid cols={props.cols || ""} classNameArgs={props.classNameArgs || ""}>
      <label htmlFor={props.name} className={"col-form-label"}>
        {props.label}
      </label>
      <input
        {...props.input}
        className="form-control"
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        readOnly={props.readOnly || false}
        type={props.type}
      />
      <ErrorAlert meta={props.meta} />
    </Grid>
  );
};

export const LabelAndCombo = props => {
  const options = props.options || [
    { value: "...", label: "...", disable: false },
    { value: "***", label: "***", selected: true }
  ];
  return (
    <Grid cols={props.cols || ""}>
      <label htmlFor={props.name} className={"col-form-label"}>
        {props.label}
      </label>
      <select {...props.input} name={props.name} className="form-control">
        {options.map((e, key) => {
          return (
            <option key={key} value={e.value} disabled={e.disabled}>
              {e.label}
            </option>
          );
        })}
      </select>
      <ErrorAlert meta={props.meta} />
    </Grid>
  );
};

export class LabelAndDate extends Component {
  // Thanks community :D
  // https://github.com/Hacker0x01/react-datepicker/issues/543

  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.bool
    }),
    placeholder: PropTypes.string
  };

  static defaultProps = {
    placeholder: ""
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.props.input.onChange(
      moment(date).format(this.props.dateFormat || "DD/MM/YYYY")
    );
  }

  render() {
    const { input, placeholder, meta } = this.props;
    var today = new Date();
    var future = new Date();
    return (
      <Grid cols={this.props.cols || ""} className="input-group">
        <label htmlFor={this.props.name} className={"col-form-label"}>
          {this.props.label}
        </label>
        <DatePicker
          {...input}
          placeholder={placeholder}
          dateFormat={this.props.dateFormat || "DD/MM/YYYY"}
          // selected={input.value ? today : null}
          minDate={today.setDate(
            today.getDate() + (this.props.daysDeltaMin || 0)
          )}
          maxDate={future.setDate(
            future.getDate() + (this.props.daysDeltaMax || 360)
          )}
          className="form-control ml-3"
          onChange={this.handleChange}
          locale={ptBR}
          id={this.props.name}
          name={this.props.name}
        />
        <i className="fa fa-calendar fa-lg" />
        <ErrorAlert meta={meta} />
      </Grid>
    );
  }
}

// Thanks community: https://github.com/jpuri/react-draft-wysiwyg/issues/556
export class LabelAndTextArea extends Component {
  constructor(props) {
    super(props);
    const editorState = this.initEditorState();
    this.state = {
      editorState
    };
    this.changeValue(editorState);
  }

  /**
   * Initialising the value for <Editor />
   */
  initEditorState() {
    const html = "";
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    return EditorState.createWithContent(contentState);
  }

  /**
   * This is used by <Editor /> to handle change
   */
  handleChange(editorState) {
    this.setState({ editorState });
    this.changeValue(editorState);
  }

  onBlur(event) {
    const value = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    this.props.input.onBlur(value);
  }

  /**
   * This updates the redux-form wrapper
   */
  changeValue(editorState) {
    const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.props.input.onChange(value);
  }

  render() {
    const { editorState } = this.state;
    return (
      <Grid id="react-wysiwyg" cols={this.props.cols}>
        <label htmlFor={this.props.name} className={"col-form-label"}>
          {this.props.label}
        </label>
        <Editor
          editorState={editorState}
          name={this.props.name}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          className="form-control"
          placeholder={this.props.placeholder || "Seu texto aqui."}
          onBlur={event => this.onBlur(event)}
          onEditorStateChange={editorState => this.handleChange(editorState)}
          // how to config: https://jpuri.github.io/react-draft-wysiwyg/#/docs
          toolbar={{
            options: ["inline", "fontSize", "fontFamily", "list", "textAlign"],
            inline: {
              inDropdown: false,
              options: ["bold", "italic", "underline", "strikethrough"]
            },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true }
          }}
        />
        <ErrorAlert meta={this.props.meta} />
      </Grid>
    );
  }
}
