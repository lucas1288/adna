const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const hasProtocol = (value: string) => /^(?:[a-z]+:)?\/\//i.test(value);

export const withBasePath = (value: string) => {
  if (!value || !basePath || hasProtocol(value)) {
    return value;
  }

  if (value === basePath || value.startsWith(`${basePath}/`)) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${basePath}${value}`;
  }

  return `${basePath}/${value}`;
};

export const getBasePath = () => basePath;
