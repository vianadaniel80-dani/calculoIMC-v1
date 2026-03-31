async function calculateIMC(event) {
  event.preventDefault();

  const peso = document.getElementById("peso").value;
  const altura = document.getElementById("altura").value; // Pega o 1.80 direto
  const resultDiv = document.getElementById("result");

  try {
    const response = await fetch("http://localhost:3000/calculoIMC", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        peso: parseFloat(peso),
        altura: parseFloat(altura), // Envia 1.80 como sua Controller exige
      }),
    });

    const data = await response.json();

    if (response.ok) {
      resultDiv.className = "alert mt-3";

      let corClasse = "";

      switch (data.classificacao) {
        case "Magreza":
          corClasse = "alert-warning"; // Amarelo
          break;
        case "Normal":
          corClasse = "alert-success"; // Verde
          break;
        case "Sobrepeso":
          corClasse = "alert-warning"; // Amarelo/Laranja
          break;
        case "Obesidade":
          corClasse = "alert-danger"; // Vermelho
          break;
        default:
          corClasse = "alert-info"; // Azul (padrão)
      }

      resultDiv.classList.add(corClasse);
      resultDiv.classList.remove("d-none");
      resultDiv.innerHTML = `
        <strong>Resultado:</strong> ${data.imc} <br>
        <strong>Classificação:</strong> ${data.classificacao}
      `;
      event.target.reset();
    } else {
      throw new Error(data.message || "Erro no cálculo");
    }
  } catch (error) {
    resultDiv.classList.remove("d-none", "alert-success");
    resultDiv.classList.add("alert-danger");
    resultDiv.innerHTML = `Erro: ${error.message}`;
  }
}
