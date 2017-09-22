describe('cms-javascript-sdk-browser', function() {
    it('should have noConflict property on exposed global of type function', function(){
        expect(typeof amp.noConflict).toBe('function');
    });
});