import ptBR from "date-fns/locale/pt-BR";
import { ContentState, convertFromHTML, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import RichTextEditor from "react-rte";
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
    placeholder: PropTypes.string,
    cols: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    dateFormat: PropTypes.string,
    daysDeltaMin: PropTypes.number,
    daysDeltaMax: PropTypes.number
  };

  static defaultProps = {
    placeholder: "",
    dateFormat: "DD/MM/YYYY",
    daysDeltaMin: 0,
    daysDeltaMax: 360,
    cols: "",
    fullScreen: false,
    inline: false
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.props.input.onChange(
      moment(date).format(this.props.dateFormat || this.defaultProps.dateFormat)
    );
  }

  render() {
    const {
      input,
      placeholder,
      meta,
      cols,
      name,
      label,
      dateFormat,
      daysDeltaMin,
      daysDeltaMax,
      fullScreen,
      inline
    } = this.props;
    var today = new Date();
    var future = new Date();
    return (
      <Grid cols={cols} className="input-group">
        <label htmlFor={name} className={"col-form-label"}>
          {label}
        </label>
        <DatePicker
          {...input}
          placeholderText={placeholder}
          dateFormat={dateFormat}
          isClearable={true}
          withPortal={fullScreen}
          inline={inline}
          minDate={today.setDate(today.getDate() + daysDeltaMin)}
          maxDate={future.setDate(future.getDate() + daysDeltaMax)}
          className="form-control ml-3"
          onChange={this.handleChange}
          locale={ptBR}
          id={name}
          name={name}
        />
        <i className="fa fa-calendar" />
        <ErrorAlert meta={meta} />
      </Grid>
    );
  }
}

// Thanks community: https://github.com/jpuri/react-draft-wysiwyg/issues/556
export class LabelAndTextArea extends Component {
  constructor(props) {
    super(props);
    const editorState = EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(`<p>${this.props.initialValue}.</p>`)
      )
    );
    this.state = {
      editorState
    };
    this.changeValue(editorState);
  }

  static defaultProps = {
    placeholder: "Seu texto aqui."
  };

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
    const { cols, name, label, placeholder, meta } = this.props;
    return (
      <Grid id="react-wysiwyg" cols={cols}>
        <label htmlFor={name} className={"col-form-label"}>
          {label}
        </label>
        <Editor
          editorState={editorState}
          name={name}
          wrapperClassName="border rounded"
          editorClassName="ml-2"
          className="form-control"
          placeholder={placeholder}
          onBlur={event => this.onBlur(event)}
          onEditorStateChange={editorState => this.handleChange(editorState)}
          // how to config: https://jpuri.github.io/react-draft-wysiwyg/#/docs

          toolbar={{
            options: ["inline", "list"],
            inline: {
              inDropdown: false,
              options: ["bold", "italic", "underline", "strikethrough"]
            },
            list: { inDropdown: false, options: ["unordered", "ordered"] }
          }}
        />
        <ErrorAlert meta={meta} />
      </Grid>
    );
  }
}

export class MyStatefulEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    value: RichTextEditor.createEmptyValue()
  };

  onChange = value => {
    console.log(value, "xxxxxxxxxxxx", this.state);
    this.setState({ value });
    if (this.props.input) {
      this.props.input.onChange(value.toString("html"));
    }
  };

  setValue(value) {}

  render() {
    return (
      <RichTextEditor
        {...this.props.input}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}
