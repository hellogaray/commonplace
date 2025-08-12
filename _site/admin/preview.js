CMS.registerPreviewTemplate("books", ({ entry }) => {
  const data = entry.getIn(["data"]);

  const quotes = data.get("quotes") || [];

  return `
    <div class="book-preview">
      <div class="book-title">${data.get("title") || ""}</div>
      <div class="book-author">by ${data.get("author") || ""}</div>

      ${data.get("image") ? `<img class="book-cover" src="${data.get("image")}" />` : ""}

      <div class="meta-grid">
        <div class="meta-item">
          <strong>Status</strong>${data.get("status") || ""}
        </div>
        <div class="meta-item">
          <strong>Rating</strong>${data.get("rating") || ""}/5
        </div>
        <div class="meta-item">
          <strong>Length</strong>${data.get("length") || ""} pages
        </div>
        <div class="meta-item">
          <strong>Owned</strong>${data.get("own") ? "Yes" : "No"}
        </div>
        <div class="meta-item">
          <strong>Start Date</strong>${data.get("start_date") || ""}
        </div>
        <div class="meta-item">
          <strong>End Date</strong>${data.get("end_date") || ""}
        </div>
      </div>

      <div class="quotes-section">
        <h3>Quotes</h3>
        ${quotes
          .map(
            q => `
              <div class="quote-block">
                ${q.get("text") || ""}
                <div class="quote-page">Page ${q.get("page") || ""}</div>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;
});
