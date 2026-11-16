(() => {
  const toast = document.getElementById('toast');
  let toastTimer;
  const announce = message => {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('visible');
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
  };
  const copy = async (value, message) => {
    try {
      await navigator.clipboard.writeText(value);
      announce(message);
    } catch {
      const dialog = document.getElementById('copy-dialog');
      const input = document.getElementById('copy-value');
      input.value = value;
      dialog.showModal();
      input.focus();
      input.select();
    }
  };
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', () => copy(button.dataset.copy, '命令已复制，在电脑终端粘贴即可'));
  });
  document.getElementById('share-page').addEventListener('click', async () => {
    const url = new URL(location.href);
    url.search = '';
    url.hash = '';
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Utoo · SEE Conf 2026', text: '让 Web 开发，轻快一点。', url: url.href });
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }
    await copy(url.href, '宣传页链接已复制');
  });
})();

