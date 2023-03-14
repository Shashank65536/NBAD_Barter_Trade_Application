const express = require('express');

exports.homePage = (req,res)=>{
    // res.send('This will navigate to the home page')
    res.render('index');
};

exports.aboutPage = (req,res)=>{
    res.render('./tradeItem/about');
};

exports.contactPage = (req,res)=>{
    res.render('./tradeItem/contact');
};

