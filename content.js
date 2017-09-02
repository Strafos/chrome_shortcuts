document.activeElement.addEventListener('keydown', function(e){
  let firstKey = e.key;
  console.log(e);
  console.log(firstKey);
  let secondKey;
  if (firstKey == "Control" || firstKey === "Shift" || firstKey === "Alt") {
    document.activeElement.addEventListener('keydown', function(f){
      secondKey = f.key;
      console.log(secondKey)
      chrome.runtime.sendMessage({"message": "key_pressed", "key": firstKey, "key2": secondKey});
    });
  }
  else {
    chrome.runtime.sendMessage({"message": "key_pressed", "key": firstKey, "key2": undefined});
  }
});