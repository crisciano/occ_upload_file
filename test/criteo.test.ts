import * as chai from 'chai'
const fs = require('fs')
const chaihttp = require('chai-http')
const expect = require('chai').expect

const contents = fs.readFileSync(
  `${process.cwd()}/criteo_UseReserva.xml`
)

chai.use(chaihttp)

describe('Tests for XML', function () {
  this.timeout(0)

  it('the file should exist', done => {
    expect(fs.existsSync(`${process.cwd()}/criteo_UseReserva.xml`)).to.be.true
    done()
  })
  it('should contain <g:id>', done => {
    expect(contents.toString().indexOf('<g:id>') > 0).to.be.true
    done()
  })
  it('should contain <g:title>', done => {
    expect(contents.toString().indexOf('<g:title>') > 0).to.be.true
    done()
  })
  it('should contain <g:description>', done => {
    expect(contents.toString().indexOf('<g:description>') > 0).to.be.true
    done()
  })
  it('should contain <g:google_product_category>', done => {
    expect(contents.toString().indexOf('<g:google_product_category>') > 0).to.be.true
    done()
  })
  it('should contain <g:product_type>', done => {
    expect(contents.toString().indexOf('<g:product_type>') > 0).to.be.true
    done()
  })
  it('should contain <g:brand>', done => {
    expect(contents.toString().indexOf('<g:brand>') > 0).to.be.true
    done()
  })
  it('should contain <g:mpn>', done => {
    expect(contents.toString().indexOf('<g:mpn>') > 0).to.be.true
    done()
  })
  it('should contain <g:link>', done => {
    expect(contents.toString().indexOf('<g:link>') > 0).to.be.true
    done()
  })
  it('should contain <g:image_link>', done => {
    expect(contents.toString().indexOf('<g:image_link>') > 0).to.be.true
    done()
  })
  it('should contain <g:price>', done => {
    expect(contents.toString().indexOf('<g:price>') > 0).to.be.true
    done()
  })
  it('should contain <g:sale_price>', done => {
    expect(contents.toString().indexOf('<g:sale_price>') > 0).to.be.true
    done()
  })
  it('should contain <g:availability>', done => {
    expect(contents.toString().indexOf('<g:availability>') > 0).to.be.true
    done()
  })
  it('should contain <g:additional_image_link>', done => {
    expect(contents.toString().indexOf('<g:additional_image_link>') > 0).to.be.true
    done()
  })
  it('should contain <g:item_group_id>', done => {
    expect(contents.toString().indexOf('<g:item_group_id>') > 0).to.be.true
    done()
  })
})
