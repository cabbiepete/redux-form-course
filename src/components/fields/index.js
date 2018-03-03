import React from 'react';
import cx from 'classnames';
import { Field } from 'redux-form';

const getValidityClassName = meta => {
  if (meta.asyncValidating) {
    return "async-validating";
  }
  if (meta.active) {
    return;
  }
  if (meta.touched && meta.invalid) {
    return "invalid";
  }
  if (meta.touched && meta.valid) {
    return "valid";
  }
}

export const customInput = (props) => {
  const { label, input, type, meta } = props;
  return (
    <div className={cx(
      "custom-input-container",
      { "flex-row-reverse": type === "checkbox" },
      { "dirty": meta.dirty },
      getValidityClassName(meta))}
    >
      <input {...input} type={type} />
      <label>{label}</label>
      {(meta.touched && !meta.active && meta.error) && <div className="feedback-text error-text">{meta.error}</div>}
    </div>
  )
}

export const customSelect = (props) => {
  return (
    <div className="custom-select-container">
      <label>{props.label}</label>
      <select {...props.input}>
        <option value="tabs">Tabs</option>
        <option value="spaces">Spaces</option>
      </select>
    </div>
  )
}

export const discounts = ({ fields, meta: { error } }) => (
  <div className="custom-field-array-container">
    {fields.map((code, index) => (
      <div key={index} className="field-array-item">
        <Field
          name={code}
          type="text"
          component={customInput}
          label={`Discount Code #${index + 1}`}
        />
        <button
          type="button"
          title="Remove"
          onClick={() => fields.remove(index)}
        >Remove code</button>
      </div>
    ))}
    {error && <div className="error">{error}</div>}
    <button type="button" onClick={() => fields.push()}>
      Add {!fields.length ? 'Discount Code' : 'Another'}
    </button>
  </div>
)