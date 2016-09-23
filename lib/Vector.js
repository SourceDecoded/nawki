class Vector {

   static add(vectorA, vectorB){
     return vectorA.map(function(value, index){
       return value + vectorB[index];
     });
   }

   static substract(vectorA, vectorB){
     return vectorA.map(function(value, index){
       return value - vectorB[index];
     });
   }

   static multiply(vectorA, vectorB){
     return vectorA.map(function(value, index){
       return value * vectorB[index];
     });
   }

   static divide(vectorA, vectorB){
     return vectorA.map(function(value, index){
       return value / vectorB[index];
     });
   }

   static rotate(vectorA, vectorB){

   }

   static projectOnVector(vectorA, vectorB){
     var scale = Vector.dotProduct(vectorA) / Vector.dotProduct(vectorB);
     return Vector.scale(vectorB, scale);
   }

   static scale (vector, scale){
     return vector.map(function(value){
       return value * scale;
     });
   }

   static negate(vector){
      return vector.map(function(value){
        return value * -1;
      });
   }

   static dotProduct(vectorA, vectorB){
     if (vectorA.length !== vectorB.length){
       throw new Error("Vectors need to be the same length.");
     }

     return vectorA.reduce(function(accumulator, value, index){
       return accumulator + (value * vectorB[index]);
     });
   }

   static magnitude (vector){
     var value = vector.reduce(function(accumulator, value){
       return accumulator + (value * value)
     }, 0);

     return Math.sqrt(value);
   }

}

module.exports = Vector;
