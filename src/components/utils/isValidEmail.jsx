export const isValidEmail = (props) => {
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
    return emailRegex.test(props);
  };
