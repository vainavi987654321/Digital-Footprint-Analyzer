const MODEL_URL =
    "https://teachablemachine.withgoogle.com/models/K0FdNIq5x/";

let model;
let image;

const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");

async function loadModel() {
    model = await tmImage.load(
        MODEL_URL + "model.json",
        MODEL_URL + "metadata.json"
    );

    console.log("AI model loaded!");
}

loadModel();

imageInput.addEventListener("change", function(event) {

    const file = event.target.files[0];

    if (!file) return;

    image = new Image();

    image.onload = function() {
        preview.src = image.src;
        preview.style.display = "block";

        analyzeBtn.disabled = false;
        result.innerHTML = "";
    };

    image.src = URL.createObjectURL(file);
});

analyzeBtn.addEventListener("click", async function() {

    if (!model || !image) return;

    result.innerHTML = "🔍 Analyzing...";

    const predictions = await model.predict(image);

    predictions.sort((a, b) => b.probability - a.probability);

    const bestPrediction = predictions[0];

    const label = bestPrediction.className;
    const confidence =
        (bestPrediction.probability * 100).toFixed(1);

    result.innerHTML =
        "Prediction: " + label +
        "<br>Confidence: " + confidence + "%";
});
