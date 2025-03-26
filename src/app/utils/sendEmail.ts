import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', //smtp server
    port: 587, //smpt port
    secure: config.NODE_ENV === 'production' ? true : false,
    auth: {
      user: 'rana.cse6.bu@gmail.com',
      pass: 'ldxl rwmw vchf vzob', //added app password
    },
  })

  await transporter.sendMail({
    from: 'rana.cse6.bu@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset ur password within 10 m', // Subject line
    text: '!', // plain text body
    html: `${html}`, // html body
  })
}
