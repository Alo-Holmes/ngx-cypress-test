/// <reference types="cypress" />

describe('First Test Suite', () => {


    it('first test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // by tag name
        cy.get('input')

        // by id
        cy.get('#inputEmail1')

        // by class value
        cy.get('.input-full-width ')

        // by attr
        //cy.get('[input-full-width]')

        // by attr and value
        cy.get('[placeholder="Email"]')

        // by entire class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by two attr
        //cy.get('[placeholder="Email"][input-full-width]')

        //by tag, attr, id and class
        cy.get('input#inputEmail1[placeholder="Email"]')

        //by cypress test id
        cy.get('[data-cy="imputEmail1"]')
    })

    it('second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layout').click()

        //Theory

        //get() - find elements on the page by locator globally
        //cy.contains('nb-card', 'Horizontal form').get('Sign in')

        //contains() - find elements by HTML text, text and locator
        cy.contains('[status="warning"]', 'Sign in').click()

        //find() - find child elements by locator
        cy.contains('nb-card', 'Horizontal form').find('button')
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')

        // cypress chains and DOM
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

    })

    it('save subject of the command', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layout').click()

        cy.contains('nb-card', 'Using the Grid').find('[data-cy="imputEmail1"]').should('be.visible')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('be.visible')

        // Can't do this like this
        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
        // usingTheGrid.find('[data-cy="imputEmail1"]').should('be.visible')
        // usingTheGrid.find('[for="inputPassword2"]').should('be.visible')

        // 1: Using Cypress Alias | This is a global variable, can be used anywhere

        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[data-cy="imputEmail1"]').should('be.visible')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('be.visible')

        // 2: Using Cypress then() method [JQuery] | 

        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {
            cy.wrap(usingTheGridForm).find('[data-cy="imputEmail1"]').should('be.visible')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('be.visible')
        })


    })

    it('Extract text values', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layout').click()

        // First Method
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // Second Method
        cy.get('[for="exampleInputEmail1"]').then(label => {

            const labelText = label.text()
            expect(labelText).to.equal('Email address')
            cy.wrap(labelText).should('contain', 'Email address')

            // Third Method

            cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
                expect(text).to.equal('Email address')

                //Fourth Method (Invoke Attr)
                cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
                    expect(classValue).to.equal('label')

                    //Fifth Mehod (Invoke Properties)
                    cy.get('[for="exampleInputEmail1"]').type('test@test.com')
                    cy.get('[for="exampleInputEmail1"]').invoke('prop', 'value')
                })

            })

        })



    })

    it('radio buttons', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layout').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
            cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({force: true})
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
            
        })

    })

//I need to get an answer from the course lecturer as to why I'm getting an assertion error even after refactoring my code

    // it.only('Web Date Pickers', () => {

    //     function selectDayFromCurrent(day){
    //         let date = new Date()
    //         date.setDate(date.getDate() + day)
    //         let futureDay = date.getDate()
    //         let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
    //         let futureYear = date.getFullYear()
    //         let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`
    //         cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
    //             if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
    //                 cy.get('[data-name="chevron-right"]').click()
    //                 selectDayFromCurrent(day)
    //             } else {
    //                 cy.get('.day-cell').not('bounding-month').contains(futureDay).click()

    //             }
    //         })
    //         return dateToAssert
    //     }

    //     cy.visit('/')
    //     cy.contains('Forms').click()
    //     cy.contains('Datepicker').click()        
    //     cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
    //         cy.wrap(input).click()            
    //         const dateToAssert = selectDayFromCurrent(5)
    //         cy.wrap(input).invoke('prop', 'value').should('contains', dateToAssert)
    //         cy.wrap(input).should('have.value', dateToAssert)
            
    //     })

    // })

    it('Lists and Dropdowns', () => {
        cy.visit('/')

        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')

        // this approach allows me to iterate through the list, to assert each list item, and only to click on the dropdown 3 times and not more since the list has 4 list items
        cy.get('nav nb-select').then( dropDown => {
            cy.wrap(dropDown).click()
            cy.get('.options-list nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim()
                cy.wrap(listItem).click()
                cy.wrap(dropDown).should('contain', itemText)
                if( index < 3){
                    cy.wrap(dropDown).click() 
                }
            })
                
            
        })
    })

    it('Web TAbles', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //How to get the row of the table in text
        cy.get('tbody').contains('tr', 'Larry').then ( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '35')
        
        //How to get row by index
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type("John")
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Smith")
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        //Assertion that the updated columns and rows are there
        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'John')
            cy.wrap(tableColumns).eq(3).should('contain', 'Smith')
        })
        })
       

        //Get each row validation | filtering
        const age = [20, 30, 40, 200]

        cy.wrap(age).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
        cy.wait(500)
        cy.get('tbody tr').each( tableRow => {
            if( age == 200){
                cy.wrap(tableRow).should('contain', 'No data found')
            }else {
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        }
        })
        })
        
    })

    it('Pop Ups and Tool Tips', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()
            cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it('Dialog Box', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()


        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

    })

    it.only('Cypress Assertions', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

    })
       
})