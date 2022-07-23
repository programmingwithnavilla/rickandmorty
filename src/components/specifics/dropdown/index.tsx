import styles from "./Dropdown.module.css";
import React, { Component } from "react";
import { IDropdownProps } from "../../../infrastructure/interface/component";
//IDropdownState
class Dropdown extends Component<IDropdownProps, any> {
  constructor(props: IDropdownProps) {
    super(props);

    this.state = {
      values: [],
      focusedValue: -1,
      isFocused: false,
      isOpen: false,
      typed: "",
    };

    // this.onFocus = ::this.onFocus
    // this.onBlur = ::this.onBlur
    // this.onKeyDown = ::this.onKeyDown

    // this.onClick = ::this.onClick
    // this.onDeleteOption = ::this.onDeleteOption
    // this.onHoverOption = ::this.onHoverOption
    // this.onClickOption = ::this.onClickOption

    // this.renderOption = ::this.renderOption
  }

  onFocus = () => {
    this.setState({
      isFocused: true,
    });
  };

  onBlur = () => {
    const { options, multiple }: any = this.props;

    this.setState((prevState: any) => {
      const { values }: any = prevState;

      if (multiple) {
        return {
          focusedValue: -1,
          isFocused: false,
          isOpen: false,
        };
      } else {
        const value = values[0];

        let focusedValue = -1;

        if (value) {
          focusedValue = options.findIndex(
            (option: any) => option.value === value
          );
        }

        return {
          focusedValue,
          isFocused: false,
          isOpen: false,
        };
      }
    });
  };

  onKeyDown = (e: any) => {
    const { options, multiple, onChange }: any = this.props;
    const { isOpen }: any = this.state;

    switch (e.key) {
      case " ":
        e.preventDefault();
        if (isOpen) {
          if (multiple) {
            this.setState((prevState: any) => {
              const { focusedValue }: any = prevState;

              if (focusedValue !== -1) {
                const [...values] = prevState.values;
                const value = options[focusedValue].value;
                const index = values.indexOf(value);

                if (index === -1) {
                  values.push(value);
                } else {
                  values.splice(index, 1);
                }
                return { values };
              }
            });
          }
        } else {
          this.setState({
            isOpen: true,
          });
        }
        break;
      case "Escape":
      case "Tab":
        if (isOpen) {
          e.preventDefault();
          this.setState({
            isOpen: false,
          });
        }
        break;
      case "Enter":
        this.setState((prevState: any) => ({
          isOpen: !prevState.isOpen,
        }));
        break;
      case "ArrowDown":
        e.preventDefault();
        this.setState((prevState: any) => {
          let { focusedValue }: any = prevState;

          if (focusedValue < options.length - 1) {
            focusedValue++;

            if (multiple) {
              return {
                focusedValue,
              };
            } else {
              onChange(options[focusedValue].value);
              return {
                values: [options[focusedValue].value],
                focusedValue,
              };
            }
          }
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        this.setState((prevState: any) => {
          let { focusedValue }: any = prevState;

          if (focusedValue > 0) {
            focusedValue--;

            if (multiple) {
              return {
                focusedValue,
              };
            } else {
              onChange(options[focusedValue].value);
              return {
                values: [options[focusedValue].value],
                focusedValue,
              };
            }
          }
        });
        break;
      default:
        if (/^[a-z0-9]$/i.test(e.key)) {
          const char = e.key;
          this.setState((prevState: any) => {
            const typed = prevState.typed + char;
            const re = new RegExp(`^${typed}`, "i");
            const index = options.findIndex((option: any) =>
              re.test(option.value)
            );

            if (index === -1) {
              return {
                typed,
              };
            }

            if (multiple) {
              return {
                focusedValue: index,
                typed,
              };
            } else {
              return {
                values: [options[index].value],
                focusedValue: index,
                typed,
              };
            }
          });
        }
        break;
    }
  };

  onClick = () => {
    this.setState((prevState: any) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  onDeleteOption = (e: any) => {
    const { value } = e.currentTarget.dataset;
    const { onChange }: any = this.props;
    this.setState((prevState: any) => {
      const [...values] = prevState.values;
      const index = values.indexOf(value);

      values.splice(index, 1);
      onChange(values);
      return { values };
    });
  };

  onHoverOption = (e: any) => {
    const { options }: any = this.props;

    const { value } = e.currentTarget.dataset;
    const index = options.findIndex((option: any) => option.value === value);

    this.setState({
      focusedValue: index,
    });
  };

  onClickOption = (e: any) => {
    const { multiple, onChange }: any = this.props;
    const { value } = e.currentTarget.dataset;
    this.setState((prevState: any) => {
      if (!multiple) {
        onChange(value);
        return {
          values: [value],
          isOpen: false,
        };
      }

      const [...values] = prevState.values;
      const index = values.indexOf(value);

      if (index === -1) {
        values.push(value);
      } else {
        values.splice(index, 1);
      }
      onChange(values);
      return { values };
    });
  };

  stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  renderValues = () => {
    const { placeholder, multiple }: any = this.props;
    const { values }: any = this.state;

    if (values.length === 0) {
      return <div className={styles.placeholder}>{placeholder}</div>;
    }

    if (multiple) {
      return values.map((value: any) => {
        return (
          <span
            key={value}
            onClick={this.stopPropagation}
            className={`${styles.multiple} ${styles.value}`}
          >
            {value}
            <span
              data-value={value}
              onClick={this.onDeleteOption}
              className={styles.delete}
            >
              <X />
            </span>
          </span>
        );
      });
    }

    return <div className={styles.value}>{values[0]}</div>;
  };

  renderOptions = () => {
    const { options }: any = this.props;
    const { isOpen }: any = this.state;

    if (!isOpen) return null;

    return (
      <div className={styles.options}>{options.map(this.renderOption)}</div>
    );
  };

  renderOption = (option: any, index: any) => {
    const { multiple }: any = this.props;
    const { values, focusedValue }: any = this.state;

    const { value } = option;

    const selected = values.includes(value);

    let className = styles.option;
    if (selected) className += ` ${styles.selected}`;
    if (index === focusedValue) className += ` ${styles.focused}`;

    return (
      <div
        key={value}
        data-value={value}
        className={className}
        onMouseOver={this.onHoverOption}
        onClick={this.onClickOption}
      >
        {multiple ? (
          <span className={styles.checkbox}>{selected ? <Check /> : null}</span>
        ) : null}
        {value}
      </div>
    );
  };

  render() {
    const { isOpen }: any = this.state;
    return (
      <div
        className={`${styles.select}`}
        tabIndex={0}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
      >
        <div className={`${styles.selection} rounded-3`} onClick={this.onClick}>
          {this.renderValues()}
          <span className={`${styles.arrow}`}>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
        </div>
        {this.renderOptions()}
      </div>
    );
  }
}

const ChevronDown = () => (
  <svg className={styles.selectSvg} viewBox="0 0 10 7">
    <path
      d="M2.08578644,6.5 C1.69526215,6.89052429 1.69526215,7.52368927 2.08578644,7.91421356 C2.47631073,8.30473785 3.10947571,8.30473785 3.5,7.91421356 L8.20710678,3.20710678 L3.5,-1.5 C3.10947571,-1.89052429 2.47631073,-1.89052429 2.08578644,-1.5 C1.69526215,-1.10947571 1.69526215,-0.476310729 2.08578644,-0.0857864376 L5.37867966,3.20710678 L2.08578644,6.5 Z"
      transform="translate(5.000000, 3.207107) rotate(90.000000) translate(-5.000000, -3.207107) "
    />
  </svg>
);

const ChevronUp = () => (
  <svg className={styles.selectSvg} viewBox="0 0 10 8">
    <path
      d="M2.08578644,7.29289322 C1.69526215,7.68341751 1.69526215,8.31658249 2.08578644,8.70710678 C2.47631073,9.09763107 3.10947571,9.09763107 3.5,8.70710678 L8.20710678,4 L3.5,-0.707106781 C3.10947571,-1.09763107 2.47631073,-1.09763107 2.08578644,-0.707106781 C1.69526215,-0.316582489 1.69526215,0.316582489 2.08578644,0.707106781 L5.37867966,4 L2.08578644,7.29289322 Z"
      transform="translate(5.000000, 4.000000) rotate(-90.000000) translate(-5.000000, -4.000000) "
    />
  </svg>
);

const X = () => (
  <svg className={styles.selectSvg} viewBox="0 0 16 16">
    <path d="M2 .594l-1.406 1.406.688.719 5.281 5.281-5.281 5.281-.688.719 1.406 1.406.719-.688 5.281-5.281 5.281 5.281.719.688 1.406-1.406-.688-.719-5.281-5.281 5.281-5.281.688-.719-1.406-1.406-.719.688-5.281 5.281-5.281-5.281-.719-.688z" />
  </svg>
);

const Check = () => (
  <svg className={styles.selectSvg} viewBox="0 0 16 16">
    <path
      d="M13 .156l-1.406 1.438-5.594 5.594-1.594-1.594-1.406-1.438-2.844 2.844 1.438 1.406 3 3 1.406 1.438 1.406-1.438 7-7 1.438-1.406-2.844-2.844z"
      transform="translate(0 1)"
    />
  </svg>
);

export default Dropdown;
