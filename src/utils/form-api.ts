import axios from 'axios'
import { toast } from 'react-toastify'
import { IFormInputs } from '../sections/Form'

export const FormApi = {
  async sendForm(formData: IFormInputs) {
    const { telegram, email, name, services, message } = formData
    let token = '1926839454:AAEfArv8WG0BYWKpLsSTldcP9fJ4zdU9saI'
    let chatId = -543315196
    const telegramView = `<b>Telegram</b>: ${telegram}%0A<b>Email</b>: ${email}%0A<b>Имя</b>: ${name}%0A<b>Тип услуги</b>: ${services}%0A<b>Сообщение</b>: ${message}`

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${telegramView}&parse_mode=html`

    await axios
      .get(url)
      .then(() => {
        toast.success('Заявка успешно отправлена!')
      })
      .catch(() => {
        toast.error('Произошла ошибка :(')
      })
  },
}
