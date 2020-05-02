export default function getStorage() {
  if (process.client) {
    return window.localStorage.getItem('usertoken');
  }
}
