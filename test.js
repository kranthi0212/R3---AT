const supertest = require('supertest');
const { expect } = require('chai');

const url = supertest('https://fakestoreapi.com');

describe('Product CRUD', () => {
    let id;

    it('adding product using post', () => {
        const body = {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        };
        return url
            .post('/products')
            .send(body)
            .then((res) => {
                id = res.body.id;
                expect(res.body.title).to.be.equal('test product');
                expect(res.body.price).to.be.equal(13.5);
                expect(res.body.description).to.be.equal('lorem ipsum set');
                expect(res.body.image).to.be.equal('https://i.pravatar.cc');
                expect(res.body.category).to.be.equal('electronic');
            })
            .catch((err) => {
                console.log('error occurred while post request');
                console.log(err);
            });
    });

    it('getting product using get', () => {
        return url
            .get(`/products/${id}`)
            .then((res) => {
                expect(res.body.id).to.be.equal(id);
                expect(res.body.title).not.to.be.equal(null);
                expect(res.body.price).not.to.be.equal(null);
                expect(res.body.description).not.to.be.equal(null);
                expect(res.body.image).not.to.be.equal(null);
                expect(res.body.category).not.to.be.equal(null);
            })
            .catch((err) => {
                console.log('error occurred while get request');
                console.log(err);
            });
    });

    it('updating product using put', () => {
        const body = {
            title: 'product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        };
        return url
            .put(`/products/${id}`)
            .send(body)
            .then((res) => {
                expect(res.body.title).to.be.equal('product');
            })
            .catch((err) => {
                console.log('error occurred while put request');
                console.log(err);
            });
    });

    it('deleting product using delete', () => {
        return url
            .delete(`/products/${id}`)
            .then((res) => {
                expect(res.body.status).to.be.equal(true);
            })
            .catch((err) => {
                console.log('error occurred while delete request');
                console.log(err);
            });
    });
});
