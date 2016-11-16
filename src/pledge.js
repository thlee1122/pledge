'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

// const myDeferral = $q.defer();

function $Promise() {
	this._state = 'pending';
	this._value;
	this._handlerGroups = [];
}

$Promise.prototype.then = function(s, e){
	if (typeof s !== 'function') { s = false };
	if (typeof e !== 'function') { e = false };

	var object = {
		successCb:	s,
		errorCb: e
	}
	this._handlerGroups.push(object);

	this.callHandlers();
}

$Promise.prototype.callHandlers = function(){
	// console.log(this._handlerGroups
	var handlerGroup;

	if(this._state !== "pending") {
		handlerGroup = this._handlerGroups.shift();
	}

	if (this._state === 'fulfilled'){
		handlerGroup.successCb(this._value);
	} else if (this._state === 'rejected'){
		handlerGroup.errorCb(this._value);
	}
}

function Deferral() {
	this.$promise = new $Promise;
}


Deferral.prototype.resolve = function(value) {
	console.log(this.$promise._handlerGroups)
	if(this.$promise._state === "pending") {
		this.$promise._state = "fulfilled";
		this.$promise._value = value;
		// this.$promise.callHandlers()
	}
}

Deferral.prototype.reject = function(reason) {
	if(this.$promise._state === "pending") {
		this.$promise._state = "rejected";
		this.$promise._value = reason;
	}
}

function defer() {
	return new Deferral;
}


const deferral1 = new Deferral;
const deferral2 = new Deferral;







/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = {
  defer: defer,
};

So in a Node-based project we could write things like this:

var pledge = require('pledge');
…
var myDeferral = pledge.defer();
var myPromise1 = myDeferral.$promise;
--------------------------------------------------------*/
