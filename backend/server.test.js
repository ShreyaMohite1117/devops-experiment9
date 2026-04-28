const request = require('supertest');
const app = require('./server');

describe('Todo API', () => {
    let createdTodoId;

    test('1. GET /todos should return an empty array initially', async () => {
        const res = await request(app).get('/todos');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('2. POST /todos should create a new todo', async () => {
        const res = await request(app)
            .post('/todos')
            .send({ text: 'Test Task' });
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.text).toBe('Test Task');
        expect(res.body.completed).toBe(false);
        expect(res.body).toHaveProperty('createdAt');
        
        createdTodoId = res.body.id;
    });

    test('3. POST /todos should fail with empty text', async () => {
        const res = await request(app).post('/todos').send({ text: '   ' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    test('4. GET /todos should return the created todo', async () => {
        const res = await request(app).get('/todos');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].id).toBe(createdTodoId);
    });

    test('5. PUT /todos/:id should update todo text', async () => {
        const res = await request(app)
            .put(`/todos/${createdTodoId}`)
            .send({ text: 'Updated Task' });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.text).toBe('Updated Task');
    });

    test('6. PUT /todos/:id should update todo completed status', async () => {
        const res = await request(app)
            .put(`/todos/${createdTodoId}`)
            .send({ completed: true });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.completed).toBe(true);
    });

    test('7. PUT /todos/:id should fail with empty text', async () => {
        const res = await request(app)
            .put(`/todos/${createdTodoId}`)
            .send({ text: '' });
        
        expect(res.statusCode).toBe(400);
    });

    test('8. PUT /todos/:id should fail for non-existent ID', async () => {
        const res = await request(app)
            .put('/todos/99999999')
            .send({ text: 'Ghost Task' });
        
        expect(res.statusCode).toBe(404);
    });

    test('9. DELETE /todos/:id should delete the todo', async () => {
        const res = await request(app).delete(`/todos/${createdTodoId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Deleted successfully');
    });

    test('10. DELETE /todos/:id should fail for non-existent ID', async () => {
        const res = await request(app).delete(`/todos/${createdTodoId}`);
        expect(res.statusCode).toBe(404);
    });
});
