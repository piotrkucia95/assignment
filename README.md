

##### PolSource assignment: <br/> 

- to open the project visit [https://piotrkucia95.github.io/](https://piotrkucia95.github.io/) or download. Downloaded project must be opened on LOCALHOST in order to load data properly. <br/> <br/>

- description:
1. Table contains task name as string data, date as string data nad done/undone specifier as boolean data. The priority is specified as the number of days until the task ""deadline". If it's less than 2 the priority is high, less than 5 medium and low if it's higher. <br/>
2. Table sorting is provided after clicking on one of column headers. <br/>
3. Table is pageable and you can select amount of rows shown at once <br/>
4. - <br/>
5. I'm not sure if I understood this one correctly. What I'm doing is I'm keeping html/js/css in separate files. I also split the js in a number of files so that it's easier to understand what they do. I'm also using factory function to load data from JSON file so if the data needs to be loaded in some other place the factory can be used again <br/>
6. I've created a simple form allowing to add and remove data from the table. <br/>
7. RWD design is provided with a use of Bootstrap framework. <br/>
8. First time the project is opened it loads data from example "data.json" file. After that it saves the data to browser's local storage using cookies. Adding, removing or marking the 'done' checkbox makes changes in stored files so the app can be used after closing the app tab. <br/>
9. -
