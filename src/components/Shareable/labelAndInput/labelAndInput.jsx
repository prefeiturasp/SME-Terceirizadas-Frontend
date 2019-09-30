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
import { dateDelta } from "../../../helpers/utilities";
import { ErrorAlert } from "../Alert";
import If from "../layout";
import { Grid } from "../responsiveBs4";
import { OpcoesCustomizadas } from "./OpcoesCustomizadas";
import "./style.scss";

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
    disabled,
    classNameInput,
    hasIcon,
    max
  } = props;
  return (
    <Grid cols={cols}>
      {label && (
        <label htmlFor={name} className={"col-form-label"}>
          {label}
        </label>
      )}
      <div className="d-flex">
        <input
          {...input}
          className={`form-control ${classNameInput}`}
          disabled={disabled}
          name={name}
          id={name}
          placeholder={placeholder}
          readOnly={readOnly}
          type={type}
          min={min}
          maxLength={max}
        />
        <If isVisible={hasIcon}>
          <i className="fas fa-pen" />
        </If>
      </div>
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
  readOnly: false,
  classNameInput: ""
};
export class LabelAndCombo extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.props.input
      ? this.props.input.onChange(value)
      : this.props.onChange(value);
    if (this.props.selectOnChange) this.props.selectOnChange(event);
  }
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
              <option key={key} value={e.uuid} disabled={e.disabled}>
                {e.nome}
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

LabelAndCombo.propTypes = {
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
LabelAndCombo.defaultProps = {
  options: [
    { uuid: "...", nome: "op1", disable: false },
    { uuid: "***", nome: "op2", selected: true }
  ],
  disabled: false
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
    disabled: false,
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

  openDatepicker = () => {
    this._calendar.setOpen(true);
    this._calendar.setFocus();
  };

  dataSelecionada(data) {
    if (data.length !== 0) {
      return moment(data, "DD/MM/YYYY")["_d"];
    } else {
      return null;
    }
  }

  render() {
    const {
      input,
      placeholder,
      meta,
      cols,
      name,
      label,
      disabled,
      dateFormat,
      minDate,
      maxDate,
      fullScreen,
      inline,
      hasIcon,
      textoLabel,
      activeCalendar
    } = this.props;
    return (
      <Grid cols={cols}>
        {label && (
          <label htmlFor={name} className={"col-form-label"}>
            {label}
          </label>
        )}
        <div>
          <div
            className={
              activeCalendar
                ? "input-group active-calendar"
                : textoLabel
                ? "input-group calendar"
                : "input-group"
            }
          >
            {textoLabel && (
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  {textoLabel}
                </span>
              </div>
            )}
            <DatePicker
              {...input}
              placeholderText={placeholder}
              dateFormat={dateFormat}
              isClearable={true}
              withPortal={fullScreen}
              inline={inline}
              minDate={minDate}
              maxDate={maxDate}
              disabled={disabled}
              selected={this.dataSelecionada(input.value)}
              className="form-control"
              ref={c => (this._calendar = c)}
              onChange={this.handleChange}
              locale={ptBR}
              id={name}
              name={name}
            />
            <If isVisible={hasIcon}>
              <i
                onClick={this.openDatepicker}
                className="fas fa-calendar-alt"
              />
            </If>
          </div>
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
    const {
      cols,
      name,
      label,
      placeholder,
      meta,
      temOpcoesCustomizadas
    } = this.props;
    return (
      <Grid id="react-wysiwyg" cols={cols}>
        {label && (
          <label htmlFor={name} className={"session-header col-form-label"}>
            {label}
          </label>
        )}
        <Editor
          editorState={editorState}
          name={name}
          wrapperClassName="wrapper-class border rounded"
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
          toolbarCustomButtons={
            temOpcoesCustomizadas && [
              <OpcoesCustomizadas
                editorState={editorState}
                onChange={this.handleChange}
              />
            ]
          }
        />
        <If isVisible={meta}>
          <ErrorAlert meta={meta} />
        </If>
      </Grid>
    );
  }
}

export const LabelAndTextAreaCustom = props => {
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
    disabled,
    classNameInput
  } = props;
  return (
    <Grid cols={cols}>
      {label && (
        <label htmlFor={name} className={"col-form-label"}>
          {label}
        </label>
      )}
      <textarea
        {...input}
        className={`form-control ${classNameInput}`}
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
  readOnly: false,
  classNameInput: ""
};
