function isYear(query) {
  const yearRegex = /^\d{4}$/;

  // Check if the query is a valid year.
  if (!yearRegex.test(query)) {
    return { success: false, error: "Please enter valid year" };
  }

  // The query is a valid year.
  return { success: true, error: false };
}

module.exports = isYear;
