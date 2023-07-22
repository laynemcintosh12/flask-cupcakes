const BASE_URL = "http://127.0.0.1:5000/api";
$(showCupcakes);

function generateCupcake(cupcake) {
return `<div data-cupcake-id=${cupcake.id}>
            <li>${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
                <button class="delete-btn">X</button>
            </li>
            <img class="img" 
                    src="${cupcake.image}" 
                    alt="${cupcake.flavor} Cupcake">
        </div>`;
}


async function showCupcakes() {
    const response = await axios.get(`${BASE_URL}/cupcakes`);
    for (let data of response.data.cupcakes) {
        let newCupcake = $(generateCupcake(data));
        $("#list").append(newCupcake);
    }
}


$("#new-cupcake-form").on("submit", async function (evt) {
    evt.preventDefault();
    let flavor = $("#form-flavor").val();
    let rating = $("#form-rating").val();
    let size = $("#form-size").val();
    let image = $("#form-image").val();
    const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor,
        rating,
        size,
        image
    });
    let newCupcake = $(generateCupcake(newCupcakeResponse.data.cupcake));
    $("#list").append(newCupcake);
    $("#new-cupcake-form").trigger("reset");
});


$("#list").on("click", ".delete-btn", async function (evt) {
    evt.preventDefault();
    let $cupcake = $(evt.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");
    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});