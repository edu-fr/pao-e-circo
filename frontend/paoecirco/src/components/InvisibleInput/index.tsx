import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { IconBaseProps } from "react-icons";
import { useField } from "@unform/core";
import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const InvisibleInput: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);

  //use states
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  //functions
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    //se o inputref tiver valor, seta true, senão, seta false
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  

  // useeffects
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <input
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      defaultValue={defaultValue}
      ref={inputRef}
      type="hidden"
      {...rest}
    />
  );
};

export default InvisibleInput;