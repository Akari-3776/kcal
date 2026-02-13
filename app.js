// ------------------------------
// 食べ物リスト → カロリー自動入力
// ------------------------------
document.getElementById("foodList").addEventListener("change", (e) => {
  const selectedCal = e.target.value;
  if (selectedCal) {
    document.getElementById("calPerItem").value = selectedCal;
  }
});

// ------------------------------
// 食べたもの一覧（1日の記録）
// ------------------------------
let dailyItems = [];

// ------------------------------
// 入力値を取得
// ------------------------------
function getInputValues() {
  const calPerItem = Number(document.getElementById("calPerItem").value);
  const quantity = Number(document.getElementById("quantity").value);
  const targetCal = Number(document.getElementById("targetCal").value);

  return { calPerItem, quantity, targetCal };
}

// ------------------------------
// 入力チェック
// ------------------------------
function validateInputs({ calPerItem, quantity }) {
  if (!calPerItem || calPerItem <= 0) return "カロリーを正しく入力してください。";
  if (!quantity || quantity <= 0) return "個数を正しく入力してください。";
  return null;
}

// ------------------------------
// 食べたものを追加
// ------------------------------
document.getElementById("addBtn").addEventListener("click", () => {
  const inputs = getInputValues();
  const error = validateInputs(inputs);

  if (error) {
    document.getElementById("result").textContent = error;
    return;
  }

  const itemTotal = inputs.calPerItem * inputs.quantity;

  // 記録に追加
  dailyItems.push({
    cal: inputs.calPerItem,
    qty: inputs.quantity,
    total: itemTotal
  });

  // 表示更新
  updateList();
  updateResult();
});

// ------------------------------
// 食べたもの一覧を表示（削除ボタンつき）
// ------------------------------
function updateList() {
  const listBox = document.getElementById("list");
  listBox.innerHTML = "<h3>今日食べたもの</h3>";

  dailyItems.forEach((item, i) => {
    listBox.innerHTML += `
      <div style="display:flex; justify-content:space-between; align-items:center; margin:5px 0;">
        <span>${i + 1}. ${item.cal}kcal × ${item.qty}個 = <b>${item.total}kcal</b></span>
        <button onclick="deleteItem(${i})" style="padding:5px 10px;">削除</button>
      </div>
    `;
  });
}

// ------------------------------
// アイテム削除
// ------------------------------
function deleteItem(index) {
  dailyItems.splice(index, 1); // 指定のアイテムを削除
  updateList();
  updateResult();
}

// ------------------------------
// 合計カロリーと目標との差を表示
// ------------------------------
function updateResult() {
  const targetCal = Number(document.getElementById("targetCal").value);
  const resultBox = document.getElementById("result");

  if (!targetCal) {
    resultBox.textContent = "目標カロリーを入力してください。";
    return;
  }

  const total = dailyItems.reduce((sum, item) => sum + item.total, 0);
  const diff = targetCal - total;

  let message = `1日の合計カロリー：${total} kcal\n`;

  if (diff > 0) {
    message += `目標まであと ${diff} kcal`;
  } else if (diff === 0) {
    message += `目標ちょうどです！`;
  } else {
    message += `目標を ${Math.abs(diff)} kcal 超えています`;
  }

  resultBox.textContent = message;
}
