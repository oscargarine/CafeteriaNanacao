import request from 'supertest'
import app from '../index.js'


describe('GET /cafes', () => {
  it('Debería responder con un status 200 ("OK")', async () => {
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

describe('DELETE /cafes/:id', () => {
  it('Debería responder con status 404 ("Página no encontrada") si el ID no existe', async () => {
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


describe('POST /cafes', () => {
  it('Debería responder con un status 201 ("Creado") al crear un nuevo café', async () => {

  const newCafe = {
    id: '5', // debemos poner un codigo que no exista en la bd ("cafes.json")
    nombre: 'Latte'
  }

    const response = await request(app).post('/cafes').send(newCafe)
    expect(response.status).toBe(201)
  })
})

describe ('PUT /cafes/:id', () => {
  it('Debería responder con status 400 ("Solicitud incorrecta") si el ID no es el mismo', async () => {
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