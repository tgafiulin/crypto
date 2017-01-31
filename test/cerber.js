"use strict";

var assert = require("assert");
var trusted = require("../index.js");
var fs = require("fs");

var DEFAULT_RESOURCES_PATH = "test/resources";
var CERBER_PACKAGE_PATH = DEFAULT_RESOURCES_PATH + "/cerber";

/**
 * check output files data
 * @returns {void}
 */
function chekOutputFiles() {
    var filebuf, cstr;

    filebuf = fs.readFileSync(CERBER_PACKAGE_PATH + "/cerber.lock", "binary");
    cstr = JSON.parse(filebuf);
    assert.equal(JSON.stringify(cstr) === JSON.stringify(["index.js#90e90dc8d37f8911d8cfba0549b2394cd02b3866",
        "package.json#8e3237ad673e7b8c5851c55d6ef9d49c6ef0d5ab"
    ]), true, "output file (cerber.lock)");

    var fd = fs.openSync(CERBER_PACKAGE_PATH + "/cerber.lock.sig", "r");
    var buffer = new Buffer(19);

    fs.readSync(fd, buffer, 0, 19, 0);
    fs.closeSync(fd);

    assert.equal((buffer.toString("utf8", 0, 19) === "-----BEGIN CMS-----"), true, "output file (cerber.lock.sig)");
}

describe("Cerber", function() {
    var cerber;

    it("init", function() {
        cerber = new trusted.utils.Cerber();
        assert.equal(cerber !== null, true);
    });

    it("sign", function() {
        var cert, key;

        cert = trusted.pki.Certificate.load(DEFAULT_RESOURCES_PATH + "/cert1.crt", trusted.DataFormat.PEM);
        key = trusted.pki.Key.readPrivateKey(DEFAULT_RESOURCES_PATH + "/cert1.key", trusted.DataFormat.PEM, "");
        cerber.sign(CERBER_PACKAGE_PATH, cert, key);
        chekOutputFiles();

        trusted.utils.Cerber.sign(CERBER_PACKAGE_PATH, cert, key);
        chekOutputFiles();
    });

    it("verify", function() {
        var res;

        res = cerber.verify(CERBER_PACKAGE_PATH);
        assert.equal(res === false, true, "verify package");

        res = trusted.utils.Cerber.verify(CERBER_PACKAGE_PATH);
        assert.equal(res === false, true, "verify package");
    });
});
