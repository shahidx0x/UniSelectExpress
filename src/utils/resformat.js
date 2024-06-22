module.exports = resformat = (
  res,
  res_code,
  res_message,
  res_data = null,
  res_error = null,
  pagination = null
) => {
  let meta = null;
  if (pagination) {
    meta = {
      limit: pagination.limit,
      totalPages: pagination.totalPages,
      currentPage: pagination.currentPage,
    };
  }   
  res.status(res_code).json({
    code: res_code,
    message: res_message,
    data: res_data,
    error: res_error,
    meta: meta,
  });
};
