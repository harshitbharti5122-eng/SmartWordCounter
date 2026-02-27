document.addEventListener("selectionchange", function () {

    let selectedText = window.getSelection().toString().trim();

    if (selectedText.length > 0) {

        let words = selectedText.split(/\s+/).filter(word => word.length > 0).length;
        let charactersWithSpaces = selectedText.length;
        let charactersWithoutSpaces = selectedText.replace(/\s/g, "").length;
        let lettersOnly = selectedText.replace(/[^a-zA-Z]/g, "").length;

        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        let rect = range.getBoundingClientRect();

        showPopup(rect.right + window.scrollX, rect.bottom + window.scrollY,
                  words, lettersOnly, charactersWithSpaces, charactersWithoutSpaces);
    }
});

function showPopup(x, y, words, letters, charWithSpace, charWithoutSpace) {

    let oldPopup = document.getElementById("wordCounterPopup");
    if (oldPopup) oldPopup.remove();

    let popup = document.createElement("div");
    popup.id = "wordCounterPopup";

    popup.innerHTML = `
        <div class="popup-title">📊 Text Statistics</div>
        <div class="popup-row"><span>Words</span><span>${words}</span></div>
        <div class="popup-row"><span>Letters</span><span>${letters}</span></div>
        <div class="popup-row"><span>Chars (with spaces)</span><span>${charWithSpace}</span></div>
        <div class="popup-row"><span>Chars (no spaces)</span><span>${charWithoutSpace}</span></div>
    `;

    popup.style.left = x + "px";
    popup.style.top = y + "px";

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 4000);
}