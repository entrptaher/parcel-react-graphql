import query from "./query.graphql";
let queriedContents = [];
function removeDeepNested(q) {
  let definitions = q.definitions;
  for (let i = 0; i < definitions.length; i++) {
    if (definitions[i].kind == "OperationDefinition") {
      const Selections = definitions[i].selectionSet.selections;
      for (let i = 0; i < Selections.length; i++) {
        if (Selections[i].selectionSet !== undefined) {
          const deepSelections = Selections[i].selectionSet.selections;
          for (let i = 0; i < deepSelections.length; i++) {
            queriedContents.push(deepSelections[i].name.value);
          }
        }
      }
    }
  }

  for (let i = 0; i < queriedContents.length; i++) {
    let fragmentSpreds = [];
    const queriedContent = queriedContents[i];
    for (let i = 0; i < definitions.length; i++) {
      if (definitions[i].name.value == queriedContent) {
        const Selections = definitions[i].selectionSet.selections;
        for (let i = 0; i < Selections.length; i++) {
          if (Selections[i].selectionSet !== undefined) {
            const deepSelections = Selections[i].selectionSet.selections;
            for (let i = 0; i < deepSelections.length; i++) {
              fragmentSpreds.push(deepSelections[i].name.value);
            }
          }
        }
      }
    }
    
    for (let i = 0; i < fragmentSpreds.length; i++) {
      const element = fragmentSpreds[i];
      for (let i = 0; i < definitions.length; i++) {
        if (definitions[i].name.value == element) {
          const Selections = definitions[i].selectionSet.selections;
          for (let i = 0; i < Selections.length; i++) {
            if (Selections[i].selectionSet !== undefined) {
              const spread = Selections[i];
              const deepSelections = Selections[i].selectionSet.selections;
              for (let i = 0; i < deepSelections.length; i++) {
                if (deepSelections[i].name.value == queriedContents[i]) {
                  const duplicate = Selections.indexOf(spread);
                  Selections.splice(duplicate, 1);
                } else {
                  const deeperSelections = deepSelections[i].name.value;
                  for (let i = 0; i < definitions.length; i++) {
                    if (definitions[i].name.value == deeperSelections) {
                      const spreadedFragments = definitions[i].selectionSet.selections;
                      for (let i = 0; i < spreadedFragments.length; i++) {
                        if(spreadedFragments[i].selectionSet !== undefined) {
                          const spreadedFragment = spreadedFragments[i].selectionSet.selections;
                          for (let i = 0; i < spreadedFragment.length; i++) {
                            const deepestSpreadedFragment = spreadedFragment[i].name.value;
                            for (let i = 0; i < definitions.length; i++) {
                              if (definitions[i].name.value == deepestSpreadedFragment) {
                                const spreadedFragments = definitions[i].selectionSet.selections;
                                for (let i = 0; i < spreadedFragments.length; i++) {
                                  if(spreadedFragments[i].selectionSet !== undefined) {
                                    const spread = spreadedFragments[i];
                                    const fragmentSpread = spread.selectionSet.selections;
                                    for (let i = 0; i < fragmentSpread.length; i++) {
                                      if(fragmentSpread[i].name.value == deeperSelections) {
                                        const duplicate = spreadedFragments.indexOf(spread);
                                        spreadedFragments.splice(duplicate, 1);
                                      };
                                      
                                    }
                                  }
                                  
                                }
                              }
                              
                            }
                            
                          }
                        }
                        
                      }
                    }
                  }
                }
              }
            }
            
            
          }
        }
      }
    }
  }
}
removeDeepNested(query);
function makeQueryInline(q, contents) {
  const definitions = q.definitions;
  for (let i = 0; i < contents.length; i++) {
    const content = contents[i];
    for (let i = 0; i < definitions.length; i++) {
      if (definitions[i].name.value == content) {
        const Selections = definitions[i].selectionSet.selections;
        for (let i = 0; i < Selections.length; i++) {
          if (Selections[i].selectionSet !== undefined) {
            let deepSelections = Selections[i].selectionSet.selections;
            for (let i = 0; i < deepSelections.length; i++) {
              const spread = deepSelections[i].name.value;
              for (let i = 0; i < definitions.length; i++) {
                if (definitions[i].name.value == spread) {
                  deepSelections[0] = definitions[i].selectionSet;
                }
              }
            }
          }
        }
      }
    }
  }
  for (let i = 0; i < queriedContents.length; i++) {
    const spreadedQuery = queriedContents[i];
    let selectionSet;
    for (let i = 0; i < definitions.length; i++) {
      if (definitions[i].name.value == spreadedQuery) {
        const selectedSelectionSet = definitions[i].selectionSet;
        selectionSet = selectedSelectionSet;
      }
    }
    let query = definitions[0].selectionSet.selections;
    for (let i = 0; i < query.length; i++) {
      if (query[i].selectionSet !== undefined) {
        query[i].selectionSet = selectionSet;
        const deepestSelections = query[i].selectionSet.selections;
        for (let i = 0; i < deepestSelections.length; i++) {
          if(deepestSelections[i].selectionSet !== undefined) {
            const deepestElements = deepestSelections[i].selectionSet.selections[0].selections;
            console.log(deepestSelections[i].selectionSet)
            for (let i = 0; i < deepestElements.length; i++) {
              if (deepestElements[i].selectionSet !== undefined) {
                let deeperFragment = deepestElements[i].selectionSet.selections;
                console.log(deeperFragment);
                const sprededElement = deepestElements[i].selectionSet.selections[0].name.value;
                for (let i = 0; i < definitions.length; i++) {
                  if (definitions[i].name.value == sprededElement) {
                    const deepestField = definitions[i].selectionSet.selections;
                    console.log(deepestField);
                    deeperFragment[0] = deepestField;
                  }
                  
                }
              }
              
            }
          }
          
        }
      }
      
    }
  }
  definitions.length = 1;
}
console.log(query);
makeQueryInline(query, queriedContents);
import { print } from "graphql/language/printer";
console.log(print(query));
