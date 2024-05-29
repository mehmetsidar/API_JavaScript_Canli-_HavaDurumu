// OpenWeatherMap API URL'si ve API anahtarı
const url = "https://api.openweathermap.org/data/2.5/";
const key = "aead2fdfbc5141b0527996938b663668";

// Enter tuşuna basıldığında çağrılan fonksiyon
const setQuery = (e) => {
  // Eğer basılan tuşun kodu 13 (Enter) ise
  if (e.keyCode == "13") {
    // searchBar input değerini al ve getResult fonksiyonunu çağır
    getResult(searchBar.value);
  }
};

// API'den hava durumu verilerini almak için kullanılan fonksiyon
const getResult = (cityName) => {
  // API isteği için gerekli URL'yi oluştur
  const query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
  // Fetch API ile hava durumu verilerini al
  fetch(query)
    .then((response) => response.json()) // Gelen yanıtı JSON formatına çevir
    .then(displayResult) // Veriyi işlemek için displayResult fonksiyonunu çağır
    .catch((error) => {
      // Hata oluşursa konsola yazdır
      console.error("Fetch hatası:", error);
    });
};

// Hava durumu verilerini görüntülemek için kullanılan fonksiyon
const displayResult = (result) => {
  // Şehir ve ülke bilgisini ekrana yazdır
  let city = document.querySelector(".city");
  city.innerText = `${result.name}, ${result.sys.country}`;

  // Sıcaklık bilgisini ekrana yazdır
  let temp = document.querySelector(".temp");
  temp.innerText = `${Math.round(result.main.temp)} °C`;

  // Hava durumu açıklamasını ekrana yazdır
  let desc = document.querySelector(".desc");
  desc.innerText = result.weather[0].description;

  // Minimum ve maksimum sıcaklık değerlerini ekrana yazdır
  let minmax = document.querySelector(".minmax");
  minmax.innerText = `${Math.round(result.main.temp_min)} °C - ${Math.round(
    result.main.temp_max
  )} °C`;
};

// Arama çubuğunu seç ve 'keypress' olayı dinleyicisini ekle
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", setQuery);
