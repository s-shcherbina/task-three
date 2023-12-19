const responseMiddleware = (req, res, next) => {
  if (res.err?.message) {
    return res
      .status(res.statusCode)
      .send({ error: true, message: res.err.message });
  }
  if (res.data) {
    return res.status(200).send(res.data);
  }
  next();
};

export { responseMiddleware };
