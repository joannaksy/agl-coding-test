import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [catMaleOwnerList, setCatMaleOwnerList] = useState();
  const [catFemaleOwnerList, setCatFemaleOwnerList] = useState();

  useEffect(() => {
    const url = 'http://agl-developer-test.azurewebsites.net/people.json';
    
    const fetchList = async() => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        mapCatList(json);

      } catch (error) {
        console.log("error", error);
      }
    };

    const mapCatList = (data) =>{
      //remove the owner with no pet
      var catMaleList = [];
      var catFemaleList = [];
      data.forEach(element => {
        if (element.pets != null){
          if (element.gender === 'Male'){
            element.pets.forEach(pet =>{
              if (pet.type === 'Cat')
                catMaleList.push(pet.name);
            })
          }else{
            element.pets.forEach(pet =>{
              if (pet.type === 'Cat')
                catFemaleList.push(pet.name);
            })
          }
        }
      });

      //Sorting the list and map to list item
      setCatFemaleOwnerList(mapListintoListItem(catFemaleList));
      setCatMaleOwnerList(mapListintoListItem(catMaleList));

    }

    const mapListintoListItem=(array)=>{
      return array.sort().map((owner)=>
      <li key={owner}> {owner}</li>);
    }


    fetchList();
  })

  return (
    <div className="App">
      <h1>Male</h1>
      {catMaleOwnerList}
      <h1>Female</h1>
      {catFemaleOwnerList}


    </div>
  );
}

export default App;
