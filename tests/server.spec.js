import request from 'supertest'
import app from '../index.js'


describe('GET /cafes', () => {
  it('debería responder con un status 200', async () => {
    const response = await request(app).get('/cafes')
    expect(response.status).toBe(200)
  })

  it('debería responder con un arreglo', async () => {
    const response = await request(app).get('/cafes')
    // opcion 1
    expect(Array.isArray(response.body)).toBe(true)
    // opcion 2
    // expect(response.body).toBeInstanceof(Array)
  })
})

describe ('DELETE /cafes', () => {
  describe('debería responder con status 404 si el ID existe', () => {
    it('debería repsonder con status 404', async () => {
      const idErroneo = '9' // un ID que no exista

      // no requerimos de un token jwt
      const response = await request(app)
        .delete(`/cafes/${idErroneo}`)
        .set('Authorization', 'Bearer cualquierToken')

      expect(response.status).toBe(404)
      expect(response.body.message)
      .toBe('No se encontró ningún cafe con ese id') // deben ser iguales!
    })
  })
})

describe('POST /cafes', () => {
  describe('debería tener la propiedad id', () => {
    const newCafe = {
      id: '5', // debemos poner un codigo que no exista en la bd ("cafes.json")
      nombre: 'Latte'
    }

    it('debería responder con un status 201', async () => {
      const response = await request(app).post('/cafes').send(newCafe)
      expect(response.status).toBe(201)
    })
  })
})

describe ('PUT /cafes', () => {
  describe('debería responder con status 400 si el ID no es el mismo', () => {
    it('debería repsonder con status 400', async () => {
      const idBueno = '3' // el ID correcto del café
      const payloadDiferenteId = {
        id: '6',
        nombre: 'Mocaccino'
      }

      const response = await request(app)
        .put(`/cafes/${idBueno}`)
        .send(payloadDiferenteId)

      expect(response.status).toBe(400)
      expect(response.body.message)
      .toBe('El id del parámetro no coincide con el id del café recibido') // deben ser iguales!
    })
  })
})