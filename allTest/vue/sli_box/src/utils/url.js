const parseURL = (url) => {
  const parser = document.createElement('a');
  const searchObj = {};
  let queries,
    key,
    value;
  parser.href = url;
  queries = parser.search.replace(/^\?/, '').split('&');
  queries.forEach((query) => {
    key = query.split('=')[0];
    value = query.split('=')[1];
    searchObj[key] = value;
  });

  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    searchObj,
    hash: parser.hash
  };
};

export default {
  parseURL
};
