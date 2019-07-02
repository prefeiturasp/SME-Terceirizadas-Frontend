import ptBR from "date-fns/locale/pt-BR";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "../../labelAndInput/node_modules/react-datepicker/dist/react-datepicker.css";
import { Editor } from "react-draft-wysiwyg";
import "../../labelAndInput/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { dateDelta } from "../../../helpers/utilities";
import { ErrorAlert } from "../Alert";
import "./custom.css";
import If from "../layout";
import { Grid } from "../responsiveBs4";

export const LabelAndInput = props => {
  const {
    cols,
    name,
    label,
    input,
    min,
    placeholder,
    readOnly,
    type,
    meta,
    disabled
  } = props;
  return (
    <Grid cols={cols}>
      {label && (
        <label htmlFor={name} className={"col-form-label"}>
          {label}
        </label>
      )}
      <input
        {...input}
        className="form-control"
        disabled={disabled}
        name={name}
        id={name}
        placeholder={placeholder}
        readOnly={readOnly}
        type={type}
        min={min}
      />
      <If isVisible={meta}>
        <ErrorAlert meta={meta} />
      </If>
    </Grid>
  );
};
LabelAndInput.propTypes = {
  cols: PropTypes.string,
  name: PropTypes.string,
  readOnly: PropTypes.bool
};
LabelAndInput.defaultProps = {
  readOnly: false
};
export class LabelAndCombo extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.props.input.onChange(value);
    if (this.props.selectOnChange) this.props.selectOnChange(event);
  }

  static propTypes = {
    cols: PropTypes.string,
    name: PropTypes.string,
    selectOnChange: PropTypes.func,
    readOnly: PropTypes.bool,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
        disable: PropTypes.bool,
        selected: PropTypes.bool
      })
    )
  };
  static defaultProps = {
    options: [
      { value: "...", label: "op1", disable: false },
      { value: "***", label: "op2", selected: true }
    ],
    disabled: false
  };
  render() {
    const { cols, name, label, input, meta, options, disabled } = this.props;
    return (
      <Grid cols={cols}>
        {label && (
          <label htmlFor={name} className={"col-form-label"}>
            {label}
          </label>
        )}
        <select
          {...input}
          disabled={disabled}
          onChange={event => this.handleChange(event)}
          name={name}
          className="form-control"
        >
          {options.map((e, key) => {
            return (
              <option key={key} value={e.value} disabled={e.disabled}>
                {e.label}
              </option>
            );
          })}
        </select>
        <If isVisible={meta}>
          <ErrorAlert meta={meta} />
        </If>
      </Grid>
    );
  }
}

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
    label: PropTypes.string,
    dateFormat: PropTypes.string,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date)
  };

  static defaultProps = {
    placeholder: "",
    dateFormat: "DD/MM/YYYY",
    minDate: dateDelta(0),
    maxDate: dateDelta(360),
    cols: "",
    fullScreen: false,
    inline: false,
    hasIcon: true
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
      minDate,
      maxDate,
      fullScreen,
      inline,
      hasIcon
    } = this.props;
    return (
      <Grid cols={cols}>
        <label htmlFor={name} className={"col-form-label"}>
          {label}
        </label>
        <div>
          <DatePicker
            {...input}
            placeholderText={placeholder}
            dateFormat={dateFormat}
            isClearable={true}
            withPortal={fullScreen}
            inline={inline}
            minDate={minDate}
            maxDate={maxDate}
            className="form-control"
            onChange={this.handleChange}
            locale={ptBR}
            id={name}
            name={name}
          />
          <If isVisible={hasIcon}>
            <i className="fa fa-calendar" />
          </If>
        </div>
        <If isVisible={meta}>
          <ErrorAlert meta={meta} />
        </If>
      </Grid>
    );
  }
}

// Thanks community: https://github.com/jpuri/react-draft-wysiwyg/issues/556
export class LabelAndTextArea extends Component {
  constructor(props) {
    super(props);
    const editorState = EditorState.createEmpty();
    this.state = {
      editorState
    };
    this.changeValue(editorState);
  }

  static defaultProps = {
    placeholder: "Seu texto aqui.",
    cols: "12 12 12 12"
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

  componentWillReceiveProps(nextProps) {
    // TODO: esse metodo ta deprecado, trocar por getDerivedStateFromProps
    // this loads data from previous state.
    const { input } = nextProps;
    if (input.value === "") {
      const editorState = EditorState.createEmpty();
      this.setState({ editorState });
      return;
    }
    if (
      input.value &&
      input.value !== this.props.value &&
      input.value !== "<p></p>\n"
    ) {
      const contentBlock = htmlToDraft(input.value);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.moveFocusToEnd(
        EditorState.createWithContent(contentState)
      );
      this.setState({ editorState });
    }
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
        <label htmlFor={name} className={"session-header col-form-label"}>
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
        <If isVisible={meta}>
          <ErrorAlert meta={meta} />
        </If>
      </Grid>
    );
  }
}
