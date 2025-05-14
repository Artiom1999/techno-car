// JWT Autentifikacija

// JWT (JSON Web Token) - tai tiesiog tekstinis raktas (tokenas), kuri serveris sugneruoja ir atiduoda vartotojui.
// Tas tokenas saugo informacija (dažniausiai vartotojo id) ir yra pasirašomas specialiu serverio slaptažodžiu kuri laikome .env faile.

// Eiga:

// Registracija

// 1. Vartotojas suveda email ir slaptažodį ir spaudžia Registruotis mygtuka.
// FRONTEND: mes siunciam POST request'a i /api/auth/register API
// BACKEND: Gaus duomenis, patikrins ar toks email jau egzistuoja, uzkoduos vartotojo slaptazodi pries sukurdamas nauja vartotoja duomenu bazeje.
// PADES: NPM paketas bcrypt - jis uzkoduos slaptazodi pries issaugojant i duomenu baze.

// 2. Sugeneruosim JWT tokena ir atiduosim vartotojui.
// FRONTEND: gaus tokena ir issaugos ji i localStorage.
// BACKEND: tokenas bus sugeneruotas naudojant jsonwwebtoken ir vartotojo id.

// Login

// 1. Sukuriame /login API endpointa, kuris priims email ir password.
// FRONTEND: vartotojas suveda email ir password ir spaudzia prisijungti mygtuka.
// BACKEND: gaus duomenis, patikrins ar suvestas email ir password, tada patikrins duomenu bazeje ar toks naudotojas egzistuoja,
// jeigu egzistuoja, patikrinsim suvesta slaptazodi su bcrypt.compare() funkcija, jeigu slaptazodziai sutampa atiduodam acsess tokena.
