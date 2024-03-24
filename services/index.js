const createPostValidation = async (posts) => {
  const data = await posts;
  const errors = [];

  // Check if data is provided
  if (!data) {
    errors.push("Data is required.");
  }

  // Check if data contains only title, body, and approved fields
  const allowedFields = ["title", "body", "approved"];
  const fields = Object.keys(data);
  const isValidFields = fields.every((field) => allowedFields.includes(field));
  if (!isValidFields) {
    errors.push(
      'Data must contain only "title", "body", and "approved" fields.'
    );
  }

  // Check if all required fields are filled
  const requiredFields = ["title", "body", "approved"];
  const unfilledFields = requiredFields.filter((field) => !data[field]);
  if (unfilledFields.length > 0) {
    errors.push(
      `Required fields (${unfilledFields.join(", ")}) must be filled.`
    );
  }

  return errors;
};

module.exports = {
  createPostValidation,
};
